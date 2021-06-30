using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Tracking_System___Api.Dtos;
using Tracking_System___Api.Models;
using Tracking_System___Api.Repositories.DriversRepo;
using Tracking_System___Api.Repositories.EmailRepo;

namespace Tracking_System___Api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;
        private readonly Context context;
        private readonly RoleManager<Role> roleManager;
        private readonly IDriversRepo driversRepo;
        private readonly IConfiguration config;
        private readonly IEmailSender emailSender;
        public AccountController(UserManager<User> userManager, SignInManager<User> signInManager, Context context, RoleManager<Role> roleManager,
            IDriversRepo driversRepo, IConfiguration config , IEmailSender emailSender)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.context = context;
            this.roleManager = roleManager;
            this.driversRepo = driversRepo;
            this.config = config;
            this.emailSender = emailSender;
        }
        [HttpPost("login")]
        public async Task<ActionResult<User>> Login(UserDto userDto)
        {
            await CreateRoles();
            await createadmin();
          
            var account = await userManager.FindByEmailAsync(userDto.Email);
            if (account == null)
            {
                return NotFound();
            }

            var result = await signInManager.CheckPasswordSignInAsync(account,userDto.Password , false);
            if (result.Succeeded)
            {
                return  Ok(new
                {
                    token = GenerateJwtToken(account).Result
                    /*account*/
                });;
            }
            else
            {
                return Unauthorized("Email or Password is not correct");
            }
        }
        [Authorize]
        [HttpPost("ChangePassword")]
        public async Task<IActionResult> ChangePassword(ChangePasswordDto model)
        {
            if (ModelState.IsValid)
            {
                var user = await userManager.GetUserAsync(User);
                if (user == null) {
                    return BadRequest("you should login first");
                }
                var result =await userManager.ChangePasswordAsync(user , model.CurrentPassword , 
                    model.NewPassword);
                if (!result.Succeeded)
                {
                    return BadRequest(result.Errors);
                }
                return Ok();
            }
            return BadRequest();
        }
        [HttpPost("ForgetPassword")]
        public async Task<ActionResult> ForgetPassword(ForgetPasswordDto model)
        {
            var user = await userManager.FindByEmailAsync(model.Email);
            if (user != null)
            {
                var token = userManager.GeneratePasswordResetTokenAsync(user);
                Random random = new Random();
                int code = random.Next(1000,2000);
                var message = new Message(new string[] { model.Email }, 
                    "Reset Password",
                        $" Dear {user.UserName} welcome \n This is your code to add new password : " +
                        $"{code}");
                emailSender.SendEmail(message);
                return Ok(new { email = model.Email , token = token.Result , code = code});
            }
            return BadRequest("Something is wrong..Try again");
        }
        [HttpPost("ResetPassword")]
        public async Task<ActionResult> ResetPassword(ResetPasswordDto resetPasswordModel)
        {
            if (ModelState.IsValid)
            {
                var user = await userManager.FindByEmailAsync(resetPasswordModel.Email);
                if (user != null)
                {
                    var result = await userManager.ResetPasswordAsync(user, resetPasswordModel.Token,
                        resetPasswordModel.NewPassword);
                    if (result.Succeeded)
                    {
                        return Ok("Succeeded");
                    }
                    return BadRequest("Failed");
                }
                return BadRequest("This user is not found");
            }
            
            return BadRequest();
        }
        [Authorize(Roles = "Admin")]
        [HttpPost("Register")]
        public async Task<ActionResult> AddDriver( Driver driver)
        {

            if (ModelState.IsValid)
            {
                var driverModel = await driversRepo.addDriver(driver);

                if (driverModel != null)
                {
                    if (await roleManager.RoleExistsAsync("Driver"))
                    {
                        await userManager.AddToRoleAsync(driverModel, "Driver");
                    }
                    
                    var message = new Message(new string[] { driver.Email }, "Welcome to tracker application",
                        $" Dear {driverModel.UserName} welcome \n   This is your password : {driver.Password}");
                    emailSender.SendEmail(message);
                    return Ok(driver);
                }
                return BadRequest();
            }
            else
            {
                return BadRequest();
            }
        }

        [ApiExplorerSettings(IgnoreApi = true)]
        [NonAction]

        public async Task createadmin()
        {
            var admin = await userManager.FindByEmailAsync("admin1@gmail.com");
            if (admin == null)
            {
                var account = new User
                {
                    UserName = "admin1",
                    Email = "admin1@gmail.com"
                };
                var result = await userManager.CreateAsync(account, "admin12");
                if (result.Succeeded)
                {
                    if (await roleManager.RoleExistsAsync("Admin"))
                        await userManager.AddToRoleAsync(account, "Admin");
                }

           }
        }
        [ApiExplorerSettings(IgnoreApi = true)]
        [NonAction]

        private async Task CreateRoles()
        {
            if (roleManager.Roles.Count() < 1)
            {
                var role = new Role
                {
                    Name = "Admin"
                };
                await roleManager.CreateAsync(role);
                role = new Role
                {
                    Name = "Driver"
                };
                await roleManager.CreateAsync(role);
            }
        }
        
        
        [ApiExplorerSettings(IgnoreApi = true)]
        [NonAction]
        private async Task<string> GenerateJwtToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.UserName)
            };

            var roles = await userManager.GetRolesAsync(user);

            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8
                .GetBytes(config.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(20),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
        [HttpPost("upload"), DisableRequestSizeLimit]
        public async Task<IActionResult> Upload()
        {
            try
            {
                var file = Request.Form.Files[0];
                var folderName = Path.Combine("wwwroot");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

                if (file.Length > 0)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fullPath = Path.Combine(pathToSave, fileName);
                    var url = Path.Combine(folderName, fileName);

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }

                    return Ok(new { url });
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }
        /*
        [ApiExplorerSettings(IgnoreApi = true)]
        [NonAction]
        public async Task confirmEmail ( string email , string token)
        {
        var  User =  await userManager.FindByEmailAsync(email);
         if (User != null)
            {
                var decodedToken = WebEncoders.Base64UrlDecode(token);
                string normalToken = Encoding.UTF8.GetString(decodedToken);
                var result = await userManager.ConfirmEmailAsync(User, normalToken);

            }
        }
        [ApiExplorerSettings(IgnoreApi = true)]
        [NonAction]
        public async Task SendEmailAsync(string toEmail, string subject, string content)
        {
            var apiKey = config["SendGridAPIKey"];
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("test@authdemo.com", "JWT Auth Demo");
            var to = new EmailAddress(toEmail);
            var msg = MailHelper.CreateSingleEmail(from, to, subject, content, content);
            var response = await client.SendEmailAsync(msg);
        }
        */
    }
}

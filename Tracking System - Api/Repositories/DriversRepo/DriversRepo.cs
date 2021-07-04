using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Tracking_System___Api.Dtos;
using Tracking_System___Api.Models;

namespace Tracking_System___Api.Repositories.DriversRepo
{
    public class DriversRepo : IDriversRepo
    {
        private readonly Context context;
        private readonly UserManager<User> _userManager;

        public DriversRepo(Context context , UserManager<User> userManager)
        {
            this.context = context;
            _userManager = userManager;
        }
        public async Task<User> addDriver(Driver model)
        {
            var driver = new User
            {
                UserName = model.FirstName,
                LastName = model.LastName,
                Email = model.Email,
                PhoneNumber = model.Phone,
                Url = model.Url,
                Adress = model.Adress,
                City = model.City
            };
            
            var result = await _userManager.CreateAsync(driver, model.Password);
            if (result.Succeeded)
                return driver;
            return null;
        }
       
        public async Task<bool> deleteDriver(int id)
        {
            var driver = await context.Users.FirstOrDefaultAsync(x => x.Id == id);
            if (driver == null)
                return false;
            if (driver.Url != null)
            {
                FileInfo file = new FileInfo(driver.Url);
                if (file.Exists)
                    file.Delete();
            }
            

            context.Users.Remove(driver);
            await context.SaveChangesAsync();
            return true;
        }
        
       
        public async Task<Driver> showDriver(int id)
        {
            var user = await context.Users.FirstOrDefaultAsync(x => x.Id == id);
            var driver = new Driver { 
                DriverId = user.Id,
                FirstName = user.UserName,
                LastName = user.LastName,
                Phone = user.PhoneNumber,
                Email = user.Email,
                Adress = user.Adress,
                City = user.City
            };
           if ( driver != null)
            {
                return driver;
            }
            return null;
        }
       
        public async Task<IEnumerable<Driver>> showDrivers()
        {
          var drivers = (await context.Users.Select(x =>new Driver{ 
              DriverId = x.Id,
           Email = x.Email,
           FirstName = x.UserName,
           LastName = x.LastName,
           Phone = x.PhoneNumber
          }).ToListAsync()).Skip(1);
            return drivers;
        }
        
        public async Task<User> updateDriver(Driver driver)
        {
            if (driver.Email != "")
            {
                var driverModel = await context.Users.FirstOrDefaultAsync(a => a.Email == driver.Email);
                if (driverModel == null)
                    return null;
                context.Users.Attach(driverModel);
                driverModel.UserName = driver.FirstName;
                driverModel.LastName= driver.LastName;
                driverModel.PhoneNumber = driver.Phone;
                driverModel.Email = driver.Email;
                driverModel.PasswordHash = driver.Password;
                driverModel.Url = driver.Url;
                context.Entry(driverModel).Property(a => a.UserName).IsModified = true;
                context.Entry(driverModel).Property(a => a.LastName).IsModified = true;
                context.Entry(driverModel).Property(a => a.PhoneNumber).IsModified = true;
                context.Entry(driverModel).Property(a => a.Email).IsModified = true;
                context.Entry(driverModel).Property(a => a.Url).IsModified = true;
                await context.SaveChangesAsync();
                return driverModel;
            }
            return null;
        }
    }
}

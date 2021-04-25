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
                Url = model.Url
            };
            
            var result = await _userManager.CreateAsync(driver, model.Password);
            if (result.Succeeded)
                return driver;
            return null;
        }
        /**
        public async Task<bool> deleteDriver(string id)
        {
            var driver = await context.Users.FirstOrDefaultAsync(x => x.Id == Id);
            if (driver == null)
                return false;
            FileInfo file = new FileInfo(driver.Url);
            if (file.Exists)
                file.Delete();

            context.drivers.Remove(driver);
            await context.SaveChangesAsync();
            return true;
        }
        */
        /*
        public async Task<User> showDriver(user id)
        {
            var driver = await context.Users.FirstOrDefaultAsync(x => x.Id == id);
           if ( driver != null)
            {
                return driver;
            }
            return null;
        }
        */
        public async Task<IEnumerable<Driver>> showDrivers()
        {
          var drivers = (await context.Users.Select(x =>new Driver{ 
           Email = x.Email,
           FirstName = x.UserName,
           LastName = x.LastName,
           Phone = x.PhoneNumber
          }).ToListAsync()).Skip(1);
            return drivers;
        }
        /**
        public async Task<Driver> updateDriver(Driver driver)
        {
            if (driver.Id != 0)
            {
                var driverModel = await context.drivers.FirstOrDefaultAsync(a => a.Id == driver.Id);
                if (driverModel == null)
                    return null;
                context.drivers.Attach(driverModel);
                driverModel.FirstName = driver.FirstName;
                driverModel.LastName= driver.LastName;
                driverModel.Phone = driver.Phone;
                driverModel.Email = driver.Email;
                driverModel.Password = driver.Password;
                driverModel.Url = driver.Url;
                context.Entry(driverModel).Property(a => a.FirstName).IsModified = true;
                context.Entry(driverModel).Property(a => a.LastName).IsModified = true;
                context.Entry(driverModel).Property(a => a.Phone).IsModified = true;
                context.Entry(driverModel).Property(a => a.Email).IsModified = true;
                context.Entry(driverModel).Property(a => a.Password).IsModified = true;
                context.Entry(driverModel).Property(a => a.Url).IsModified = true;
                await context.SaveChangesAsync();
                return driverModel;
            }
            return null;
        }*/
    }
}

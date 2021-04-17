using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tracking_System___Api.Dtos;
using Tracking_System___Api.Models;

namespace Tracking_System___Api.Repositories.DriversRepo
{
    public class DriversRepo : IDriversRepo
    {
        private readonly Context context;

        public DriversRepo(Context context)
        {
            this.context = context;
        }
        public async Task addDriver(Driver driver)
        {
            await context.AddAsync(driver);
            await context.SaveChangesAsync();
        }

        public async Task deleteDriver(int id)
        {
            var driver = await context.drivers.FirstOrDefaultAsync(x => x.Id == id);
            if (driver != null)
            {
                 context.Remove(driver);
                await context.SaveChangesAsync();
            }
        }

        public async Task<Driver> showDriver(int id)
        {
            var driver = await context.drivers.FirstOrDefaultAsync(x => x.Id == id);
           if ( driver != null)
            {
                return driver;
            }
            return null;
        }

        public async Task<IList<Driver>> showDrivers()
        {
          var drivers = await context.drivers.ToListAsync();
            return drivers;
        }

        public async Task<Driver> updateDriver(Driver driver, int id)
        {
            if (driver.Id == id)
            {
                context.Entry(driver).State = EntityState.Modified;
                await context.SaveChangesAsync();
                return driver;
            }
            else
                return null;
        }
    }
}

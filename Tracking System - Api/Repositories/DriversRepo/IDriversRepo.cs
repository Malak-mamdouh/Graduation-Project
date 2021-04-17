using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tracking_System___Api.Dtos;

namespace Tracking_System___Api.Repositories.DriversRepo
{
   public interface IDriversRepo
    {
        Task addDriver(Driver driver);
        Task<IList<Driver>> showDrivers();
        Task deleteDriver( int id);
        Task<Driver> updateDriver(Driver driver, int id);
        Task<Driver> showDriver(int id);
    } 
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tracking_System___Api.Dtos;
using Tracking_System___Api.Models;

namespace Tracking_System___Api.Repositories.DriversRepo
{
   public interface IDriversRepo
    {
        Task<User> addDriver(Driver driver);
        
        Task<IEnumerable<Driver>> showDrivers();
        Task<bool> deleteDriver(int id);
        Task<User> updateDriver(int id , Driver driver);
        Task<Driver> showDriver(int id);
    } 
}

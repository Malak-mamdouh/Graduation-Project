using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tracking_System___Api.Models;

namespace Tracking_System___Api.Repositories.DepartmentRepo
{
  public  interface IDepartmentRepo
    {
        Task<IList<Department>> showDepartments();
        Task<Department> showDepartment(int id);
        Task addDepartment(Department department);
        Task deletedepartment(int id);
        Task<Department> updatedepartment(Department department, int id);
    }
}

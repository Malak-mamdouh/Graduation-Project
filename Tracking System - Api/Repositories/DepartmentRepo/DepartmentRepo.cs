using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tracking_System___Api.Models;

namespace Tracking_System___Api.Repositories.DepartmentRepo
{
    public class DepartmentRepo : IDepartmentRepo
    {
        private readonly Context context;

        public DepartmentRepo(Context context)
        {
            this.context = context;
        }
        public async Task addDepartment(Department department)
        {
            await context.Departments.AddAsync(department);
            await  context.SaveChangesAsync();

        }

        public async Task deletedepartment(int id)
        {
            var department = await context.Departments.FirstOrDefaultAsync(x=>x.Id == id);
            context.Remove(department);
        }

        public async Task<Department> showDepartment(int id)
        {
            var department = await context.Departments.FirstOrDefaultAsync(x => x.Id == id);
            return department;
        }

        public async Task<IList<Department>> showDepartments()
        {
            var departments = await context.Departments.ToListAsync();
            return departments;
        }

        public async Task<Department> updatedepartment(Department department, int id)
        {
            if (id == department.Id)
            {
                context.Entry(department).State = EntityState.Modified;
                await context.SaveChangesAsync();
                return department;
            }
            else
            {
                return null;
            }
        }
    }
}

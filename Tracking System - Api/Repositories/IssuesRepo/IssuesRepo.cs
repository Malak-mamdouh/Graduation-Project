using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tracking_System___Api.Models;

namespace Tracking_System___Api.Repositories.IssuesRepo
{
    public class IssuesRepo : IIssuesRepo
    {
        private readonly Context context;

        public IssuesRepo( Context context)
        {
            this.context = context;
        }
        public async Task addissue(Issues issue)
        {
            var issuedto = new Issues { Status = issue.Status, Date = issue.Date, Description = issue.Description, ReportedBy = issue.ReportedBy, AssetId = issue.AssetId, Asset = context.assets.FirstOrDefault(x => x.Id == issue.AssetId) };
          await  context.issues.AddAsync(issuedto);
            await context.SaveChangesAsync();
        }

        public async Task deleteIssue(int id)
        {
           var issue = await showIssue(id);
            context.issues.Remove(issue);
           await context.SaveChangesAsync();

        }

        

        public async Task<Issues> showIssue(int id)
        {
            return await context.issues.Include(x => x.Asset).FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<IList<Issues>> showissues()
        {
            return await context.issues.Include(x=>x.Asset).ToListAsync();
        }

        public async Task<Issues> updateIssue(Issues issues, int id)
        {
            if (id == issues.Id)
            {
                context.Entry(issues).State = EntityState.Modified;
               await context.SaveChangesAsync();
               return  issues;
            }
            else
            {
                return null;
            }
        }
    }
}

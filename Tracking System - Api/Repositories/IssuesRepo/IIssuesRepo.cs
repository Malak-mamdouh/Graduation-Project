using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tracking_System___Api.Models;

namespace Tracking_System___Api.Repositories.IssuesRepo
{
   public interface IIssuesRepo
    {
        Task<IList<Issues>> showissues();
        Task<Issues> showIssue(int id);
        Task addissue(Issues issue);
        Task deleteIssue(int id);
        Task<Issues> updateIssue(Issues issues, int id);
    }
}

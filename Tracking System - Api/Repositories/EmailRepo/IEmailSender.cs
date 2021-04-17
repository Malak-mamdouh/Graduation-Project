using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tracking_System___Api.Models;

namespace Tracking_System___Api.Repositories.EmailRepo
{
   public interface IEmailSender
    {
        void SendEmail(Message message);

    }
}

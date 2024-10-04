using Microsoft.EntityFrameworkCore;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace SPNI.Server.Model
    
{
  
    public class ApplicationUserManageMinistry
    {

        public int Id { get; set; }
        public string ApplicationUserId { get; set; } = null!;
     

        public int ManageMinistryId { get; set; }  
    
    }
}

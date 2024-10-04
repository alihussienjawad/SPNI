using SPNI.Server.Model;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SPNI.Models
{
   
    public class News
    {
       
        public int Id { get; set; }

        [NotMapped]  
        public string ApplicationUserIdEn { get; set; } = null!;
        public string ApplicationUserId { get; set; } = null!;
        public ApplicationUser? ApplicationUser { get; set; }

       
        public string Details { get; set; } = null!;
        public string DetailsEn { get; set; } = null!;
 
 
        public bool Can { get; set; } = false;
        public bool CanAll { get; set; } = true;
    }
}

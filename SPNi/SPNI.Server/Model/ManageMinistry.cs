using Microsoft.EntityFrameworkCore;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace SPNI.Server.Model
    
{
    [Keyless]
    public class ManageMinistry
    {
 
        
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string NameEn { get; set; } = null!;
   

    }
}

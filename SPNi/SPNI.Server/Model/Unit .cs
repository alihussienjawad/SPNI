using Microsoft.EntityFrameworkCore;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace SPNI.Server.Model
    
{
    [Keyless]
    public class Unit
    {

        [Required]
        [Display(Name="رقم الوحدة")]
        public int Ur_no { get; set; }
        [Required]
        [Display(Name = "اسم الوحدة")]
        public string? Name { get; set; }
        [Required]
        [Display(Name = " رقم التشكيل")]
        public int TId { get; set; }
        [Required]
        [Display(Name = " اسم التشكيل")]
        public string? TName { get; set; }
        public int UnitCount { get; set; }


    }
}

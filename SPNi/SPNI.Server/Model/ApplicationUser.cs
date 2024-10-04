using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SPNI.Models;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SPNI.Server.Model
    
{

    public class ApplicationUser : IdentityUser
    {
        [Display(Name = "الوحدة")]
        public int ur_no { get; set; }

        [Display(Name = "كلمة المرور")]
        public string Password { get; set; } = null!;
        [Required]
        [Display(Name = "الرقم الاحصائي لمستخدم النظام")]
        public long PersonNo { get; set; }
        [Required]
        [Display(Name = "اسم مستخدم النظام")]
        public string PersonName { get; set; } = null!;

        [Display(Name = "المنصب")]
        public string? PersonPosition { get; set; }
        [Display(Name = "اخر حالة نشاط للمستخدم")]
        public DateTime LastLogin { get; set; }
        [Required]
        [Display(Name = "تفعيل تسجيل الدخول التلقائي")]
        public int User_state { get; set; }
      
        public bool PassChange { get; set; }
        [Display(Name = "الرتبة")]
        public int RankId { get; set; }
        public Rank? Ranks { get; set; } 

        [Display(Name = "رقم الهاتف")]
        public long Cisco { get; set; }
        public DateTime Created_date { get; set; }
        public string Created_by { get; set; } = string.Empty;
        public DateTime Updated_date { get; set; }
        public string Updated_by { get; set; } = string.Empty;
        public List<Posted> Posteds { get; set; } = [];
         public List<SeenPosted> SeenPosteds { get; set; }= [];
        public bool SeenUpdate { get; set; }
        public DateTime PassChangeDate { get; set; }

        public int ClosedAccountFlag { get; set; }
        public string ClosedBy { get; set; } = string.Empty;

        public bool HrTest { get; set; }

     
        public string RefreshToken { get; set; } = string.Empty;
        public DateTime RefreshTokenExpiryTime { get; set; }

        [NotMapped]
        public string UnitName { get; set; } = string.Empty;
        [NotMapped]
        public string RankName { get; set; } = string.Empty;
        [NotMapped]
        public List<int> UnitUser { get; set; } =[];
        public List<News> Newses { get; set; } =[];
        public List<Images> Imageses { get; set; } =[];
    }
    }

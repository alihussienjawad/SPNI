using Microsoft.EntityFrameworkCore;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SPNI.Server.Model
    
{
 
    public class RuleOfficerMinistry
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string NameEn { get; set; } = null!;
        public List<OfficerInfo>? OfficerInfo { get; set; }
        public List<SubManageMinistry>? SubManageMinistrys { get; set; }
    }
}

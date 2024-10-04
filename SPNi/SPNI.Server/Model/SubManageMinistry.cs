 
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SPNI.Server.Model
    
{
 
    public class SubManageMinistry
    {
        [NotMapped]
        public int Id1 { get; set; }
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string NameEn { get; set; } = null!;
        public int  Sort { get; set; }
        public bool  Active { get; set; }
        public string? Position { get; set; }
        public string? PositionEn { get; set; }
   
        public int RankId { get; set; }
        public Rank? Rank { get; set; }
        public int RuleOfficerMinistryId { get; set; }
        public RuleOfficerMinistry? RuleOfficerMinistrys { get; set; }
        public DateTime From { get; set; }
        public DateTime To { get; set; }

    }
}

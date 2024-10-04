using Microsoft.EntityFrameworkCore;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace SPNI.Server.Model
    
{
    
    public class OfficerInfo
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string NameEn { get; set; } = null!;
       
        public DateTime From { get; set; }  
        public DateTime To { get; set; }  
        public string? Position { get; set; }
        public string? PositionEn { get; set; }
        public int Sort { get; set; }
        public bool Active { get; set; }
        public int CountryId { get; set; }
        public Country? Country { get; set; }
        public int RankId { get; set; }
        public Rank? Rank { get; set; }
        public int RuleOfficerMinistryId { get; set; }
        public RuleOfficerMinistry? RuleOfficerMinistrys { get; set; }
        
        public List<SpiAttitude>? SpiAttitude { get; set; }

    }
}

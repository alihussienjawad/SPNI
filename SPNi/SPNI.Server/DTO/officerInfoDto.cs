 

namespace SPNI.Server.DTO
{
    public class CountryList
    {
        public string Label { get; set; } = null!;
        public string LabelEn { get; set; } = null!;
        public int Value { get; set; } 

    }
    public class RankList
    {
        public string Label { get; set; } = null!;
        public string LabelEn { get; set; } = null!;
        public int Value { get; set; }

    }
    public class RuleList
    {
        public string Label { get; set; } = null!;
        public string LabelEn { get; set; } = null!;
        public int Value { get; set; }

    }
    public class OfficerInfoDto
    {
       
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string NameEn { get; set; } = null!;
        public string? Position { get; set; }
        public string? PositionEn { get; set; }
        public bool Active { get; set; }
        public int CountryId { get; set; }  
        public int RuleOfficerMinistryId { get; set; }  
        public int RankId { get; set; }  
        public int Sort { get; set; }  
        public string? From { get; set; }  
        public string? To { get; set; }
        
    }

    public class OfficerInfoDtoID : OfficerInfoDto
    {
        public string CountryName { get; set; } = string.Empty;
        public string CountryNameEn { get; set; } = string.Empty;
        public string RankName{ get; set; } = string.Empty;
        public string RankNameEn{ get; set; } = string.Empty;
        public string RuleOfficerMinistryName { get; set; } = string.Empty;
        public string RuleOfficerMinistryNameEn { get; set; } = string.Empty;
    }


    public class SubManageMinistrysDto
    {
       
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string NameEn { get; set; } = string.Empty;
        public string? Position { get; set; }
        public string? PositionEn { get; set; }
 
        public int RankId { get; set; }
        public int RuleOfficerMinistryId { get; set; }
        public bool Active { get; set; }
        public int Sort { get; set; }
        public string? From { get; set; }
        public string ?To { get; set; }
     
    }

    public class SubManageMinistrysDtoID : SubManageMinistrysDto
    {
       
        public string RankName { get; set; } = string.Empty;
        public string RankNameEn { get; set; } = string.Empty;
        public string RuleOfficerMinistryName { get; set; } = string.Empty;
        public string RuleOfficerMinistryNameEn { get; set; } = string.Empty;

    }

}

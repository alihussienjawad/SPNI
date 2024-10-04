 

namespace SPNI.Server.DTO
{

    public class TargetList
    {
        public string Label { get; set; } = string.Empty;
        public string LabelEn { get; set; } = string.Empty;
        public int Value { get; set; }



    }
    public class OfficerList
    {
        public string Label { get; set; } = string.Empty;
        public string LabelEn { get; set; } = string.Empty;
        public int Value { get; set; }

    }

    public class YearList
    {
        public string Label { get; set; } = string.Empty;
        public int Value { get; set; }

    }
    public class ManageMinistryList
    {
        public string Label { get; set; } = string.Empty;
        public string LabelEn { get; set; } = string.Empty;
        public int Value { get; set; }

    }
    public class TargetsList
    {
        public string Label { get; set; } = string.Empty;
        public string LabelEn { get; set; } = string.Empty;
        public int Value { get; set; }

    }
    public class SpiAttitudeDto
    {
        public int Id1 { get; set; }
        public int Id { get; set; }
        public int TargetId { get; set; }
     
        public int OfficerInfoId { get; set; }
   
        public int ManageMinistryId { get; set; }
        public string Follow { get; set; } = string.Empty;
        public string FollowEn { get; set; } = string.Empty;
        public string ActionTaken { get; set; } = string.Empty;
        public string ActionTakenEn { get; set; } = string.Empty;
        public string Suggistion { get; set; } = string.Empty;
        public string SuggistionEn { get; set; } = string.Empty;
        public string Resolution { get; set; } = string.Empty;
        public string ResolutionEn { get; set; } = string.Empty;
        public int Year { get; set; }
        public DateTime StartDateToComplete { get; set; } = DateTime.Now;
        public DateTime EndDateToComplete { get; set; } = DateTime.Now;
        public int TargetScorr { get; set; }
        public int RateComplete { get; set; }
        public bool IsComplete { get; set; } = false;
        public bool EndNotComplete { get; set; } = false;
        public bool IsTrue { get; set; }
        public bool Mujmal { get; set; }
       
    }
    public class SpiAttitudeDtoID : SpiAttitudeDto
    {
        public string TargetName { get; set; } = string.Empty;
        public string TargetNameEn { get; set; } = string.Empty;
        public int TargetSort { get; set; }  
        public int PerentTargetId { get; set; }  
    
        public string OfficerName { get; set; } = string.Empty;
        public string OfficerNameEn { get; set; } = string.Empty;
        public string ManageMinistryName { get; set; } = string.Empty;
        public string ManageMinistryNameEn { get; set; } = string.Empty;
        public List<SpiAttitudeDtoID> SubSpiAttitude { get; set; } = [];

    }
}


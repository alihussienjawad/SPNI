using Microsoft.EntityFrameworkCore;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace SPNI.Server.Model
    
{
    
    public class SpiAttitude
    {
        public int Id { get; set; }
        public int TargetId { get; set; }
        public Target? Target { get; set; }
        public int OfficerInfoId { get; set; }
        public OfficerInfo? OfficerInfo { get; set; }
        public int ManageMinistryId { get; set; }
        public string Follow { get; set; } = string.Empty;
        public string FollowEn { get; set; } = string.Empty;
        public string ActionTaken { get; set; } = string.Empty;
        public string ActionTakenEn { get; set; } = string.Empty;
        public string Suggistion { get; set; } = string.Empty;
        public string SuggistionEn { get; set; } = string.Empty;
        public string Resolution { get; set; } = string.Empty;
        public string ResolutionEn { get; set; } = string.Empty;
        public int Day { get; set; } = DateTime.Now.Day;
        public int Month { get; set; } = DateTime.Now.Month;
        public int Year { get; set; }
        public DateTime FullDate { get; set; } = DateTime.Now;
        public string Note { get; set; } = string.Empty;
        public bool IsTrue { get; set; }=false;
        public bool Mujmal { get; set; }
        public bool IsComplete { get; set; }=false;
        public bool EndNotComplete { get; set; }=false;
        public DateTime StartDateToComplete { get; set; } = DateTime.Now;
        public DateTime EndDateToComplete { get; set; } = DateTime.Now;

        public int RateComplete { get; set; } 
    }
}

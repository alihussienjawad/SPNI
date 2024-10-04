using Microsoft.EntityFrameworkCore;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SPNI.Server.Model
{
    public class Target
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string NameEn { get; set; } = null!;
    
        public int PerentTargetId { get; set; }
        public int TargetScorr { get; set; }
        public int Sort { get; set; }
        public bool Active { get; set; }
        public bool Moshtrak { get; set; }
        public bool MainTarget { get; set; }
        public int Day { get; set; } = DateTime.Now.Day;
        public int Month { get; set; } = DateTime.Now.Month;
        public int Year { get; set; }
        public DateTime FullDate { get; set; } = DateTime.Now;
        public List<SpiAttitude>? SpiAttitude { get; set; }

      
    }
}


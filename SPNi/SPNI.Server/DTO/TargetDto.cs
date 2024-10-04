 

namespace SPNI.Server.DTO
{

    
    public class TargetDto
    {
       
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string NameEn { get; set; } = null!;
        public int Sort { get; set; }
        public bool Active { get; set; }
        public bool Moshtrak { get; set; }
        public int Year { get; set; }
        public int PerentTargetId { get; set; }
        public int TargetScorr { get; set; }
        public bool MainTarget { get; set; }

        public List<TargetDto>? SubTargets { get; set; }
    }
    public class TargetScorrDto
    {
        public int MainTargetScorr { get; set; }
        public int SumSubTargetScorr { get; set; }
    }

}

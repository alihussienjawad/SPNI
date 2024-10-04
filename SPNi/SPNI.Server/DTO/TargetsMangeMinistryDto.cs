namespace SPNI.Server.DTO
{
    public class TargetsMangeMinistryDto
    {
       public int Id { get; set; }
       public int MangeMinistryId { get; set; }
        public string MangeMinistryName { get; set; } = null!;
        public string MangeMinistryNameEn { get; set; } = null!;
       public List<TargetsListDto>? TargetsMangeMinistryList { get; set; }
       public List<int> TargetsList { get; set; } = [];
    }

     public class TargetsListDto
    {
        public string Label { get; set; } = null!;
        public string LabelEn { get; set; } = null!;
       public int Value { get; set; } 

   }
}

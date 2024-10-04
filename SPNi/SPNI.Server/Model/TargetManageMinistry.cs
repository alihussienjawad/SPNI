using System.ComponentModel.DataAnnotations.Schema;

namespace SPNI.Server.Model
{
    public class TargetManageMinistry
    {
        public int Id { get; set; }  
        public int ManageMinistryId { get; set; }
        public int TargetId { get; set; }


    }
}

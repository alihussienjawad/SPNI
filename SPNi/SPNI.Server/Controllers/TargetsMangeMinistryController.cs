using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SPNI.Server.Data;
using SPNI.Server.DTO;
using SPNI.Server.Model;

namespace SPNI.Server.Controllers
{
    //[Authorize(Roles = "RajManger,Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class TargetsMangeMinistryController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TargetsMangeMinistryController(ApplicationDbContext context)
        {
           _context = context;
        }


        [HttpGet("GetTargetsManage")]
        public async Task<ActionResult<IEnumerable<TargetsMangeMinistryDto>>> GetTargetsManage()
        {
            

            return  await  (from m in _context.ManageMinistry
                 
                 select new TargetsMangeMinistryDto
                 {
                     Id = m.Id,
                     MangeMinistryId=m.Id,
                     MangeMinistryName=m.Name,
                     MangeMinistryNameEn=m.NameEn,
                    TargetsMangeMinistryList=GetTargetsManageList(m.Id,_context)
                 }).ToListAsync();

        }

        private static List<TargetsListDto> GetTargetsManageList(int id, ApplicationDbContext context)
        {
            return
            [
                .. (from MT in context.TargetManageMinistries
                                    join T in context.Targets on MT.TargetId equals T.Id
                    where MT.ManageMinistryId == id
                                    orderby T.Sort
                                    select new TargetsListDto
                                    {
                                        Label=T.Name,
                                        LabelEn=T.NameEn,
                                        Value=T.Id
                                    }),
            ];
        }

        [HttpGet("GetTargetsMangeMinistryList")]
        public async Task<ActionResult<IEnumerable<TargetsListDto>>> GetTargetsMangeMinistryList(int id)
        {
            List<TargetsListDto> targetsList = [];

            targetsList= await (from T in _context.Targets
                                where T.MainTarget && T.Moshtrak
                          orderby T.Sort
                          select new TargetsListDto
                          {
                              Label = T.Name,
                              LabelEn = T.NameEn,
                              Value = T.Id
                          }).ToListAsync();

            IEnumerable<int> ints = (from tm in _context.TargetManageMinistries
                                     join t in _context.Targets on tm.TargetId equals t.Id
                                     where !t.Moshtrak && t.MainTarget
                                     select t.Id
                                   );
       

            var x = await (from T in _context.Targets
                           where T.MainTarget && !T.Moshtrak
                           && !ints.Any(i => i == T.Id)
                           orderby T.Sort
                           select new TargetsListDto
                           {
                               Label = T.Name,
                               LabelEn = T.NameEn,
                               Value = T.Id
                           }).ToListAsync();

            targetsList.AddRange(x);

            var y = await (from tm in _context.TargetManageMinistries
                           join t in _context.Targets on tm.TargetId equals t.Id
                           where tm.ManageMinistryId==id
                           && t.MainTarget && !t.Moshtrak
                           orderby t.Sort
                           select new TargetsListDto
                           {
                               Label = t.Name,
                               LabelEn = t.NameEn,
                               Value = t.Id
                           }).ToListAsync();

            targetsList.AddRange(y);

            return Ok(targetsList);
        }

        [HttpPut("{id}")]
        public async Task<bool> PutTargetsMangeMinistry(int id, TargetsMangeMinistryDto dto)
        {
            if(id==dto.Id)
            {
                List<TargetManageMinistry>? targetManageMinistries=await _context.TargetManageMinistries.Where(i=>i.ManageMinistryId==dto.MangeMinistryId)
                    .ToListAsync();
                if(targetManageMinistries!=null && targetManageMinistries.Any())
                {
                    _context.TargetManageMinistries.RemoveRange(targetManageMinistries);
                    await _context.SaveChangesAsync();

                }
                if(dto.TargetsList!=null && dto.TargetsList.Any())
                {
                    List<TargetManageMinistry>? targes = [];
                    foreach(int item in dto.TargetsList)
                    {
                        targes.Add(new()
                        {
                            ManageMinistryId = dto.MangeMinistryId,
                            TargetId = item,
                        });
                    }
                    _context.TargetManageMinistries.AddRange(targes);
                    return await _context.SaveChangesAsync()>0;
                }

            }
            return false;
        }

    }
}

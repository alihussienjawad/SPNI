using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using SPNI.Server.Data;
using SPNI.Server.DTO;
using SPNI.Server.Model;

namespace SPNI.Server.Controllers
{
    //[Authorize(Roles = "RajManger,Admin")]
    [Route("api/[controller]")]


    [ApiController]
    public class TargetsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TargetsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Targets
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TargetDto>>> GetTargets()
        {


            return await (from s in _context.Targets

                          where s.MainTarget

                          select new TargetDto
                          {
                              Id = s.Id,
                              MainTarget = s.MainTarget,
                              PerentTargetId = s.PerentTargetId,
                              TargetScorr = s.TargetScorr,
                              Name = s.Name ?? "",
                              NameEn = s.NameEn ?? "",
                              Sort = s.Sort,
                              Moshtrak = s.Moshtrak,
                              Active = s.Active,
                              Year = s.Year,
                              SubTargets = GetSubTargets(s.Id, _context)
                          }).OrderBy(i => i.Sort).ToListAsync();



        }

        private static List<TargetDto> GetSubTargets(int id, ApplicationDbContext context)
        {
            return [.. (from s in  context.Targets

                  where !s.MainTarget && s.PerentTargetId == id

                  select new TargetDto
                  {
                      Id = s.Id,
                      MainTarget = s.MainTarget,
                      PerentTargetId = s.PerentTargetId,
                      TargetScorr = s.TargetScorr,
                      Name = s.Name ?? "",
                      NameEn = s.NameEn ?? "",
                      Sort = s.Sort,
                      Moshtrak = s.Moshtrak,
                      Active = s.Active,
                      Year = s.Year,
                      SubTargets =null,
                  }).OrderBy(i => i.Sort)];
        }

        // GET: api/Targets/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Target>> GetTarget(int id)
        {
            var target = await _context.Targets.FindAsync(id);

            if (target == null)
            {
                return NotFound();
            }

            return target;
        }

        // PUT: api/Targets/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]

        public async Task<bool> PutTarget(int id, TargetDto targetDto)
        {
            var s = _context.Targets.Find(id);
            if (s == null)
            {
                return false;
             }
            
            s.Active = targetDto.Active;
            s.Name = targetDto.Name;
            s.NameEn = targetDto.NameEn;
            s.Moshtrak = targetDto.Moshtrak;
            s.PerentTargetId = targetDto.MainTarget ? 0 :targetDto.PerentTargetId;
            s.MainTarget = targetDto.MainTarget;
            s.TargetScorr = targetDto.TargetScorr;
            s.Sort = targetDto.Sort;
            s.Year = targetDto.MainTarget ? targetDto.Year : _context.Targets.Where(i=>i.Id == targetDto.PerentTargetId).Select(i=>i.Year).FirstOrDefault();
            s.Day = DateTime.Now.Day;
            s.Month = DateTime.Now.Month;



            _context.Targets.Update(s);
            return await _context.SaveChangesAsync() > 0;

        }

        // POST: api/Targets
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<bool>> PostTarget(TargetDto targetdto)
        {
        

           
            if (_context.Targets.Any(i => i.Name == targetdto.Name && i.Year == targetdto.Year))
            {
                return false;
            }
            else
            {
                Target target = new()
                {
                    Day = DateTime.Now.Day,
                    Month = DateTime.Now.Month,
                     
                    Year = targetdto.MainTarget ? targetdto.Year : _context.Targets.Where(i => i.Id == targetdto.PerentTargetId).Select(i => i.Year).FirstOrDefault(),
                    Name = targetdto.Name,
                    NameEn = targetdto.NameEn,
                    Active = targetdto.Active,
                    Sort = targetdto.Sort,
                    MainTarget = targetdto.MainTarget,
                    Moshtrak = targetdto.Moshtrak,
                    PerentTargetId = targetdto.MainTarget ? 0 : targetdto.PerentTargetId,
                    TargetScorr = targetdto.TargetScorr,
                
                  
                    
                };

                _context.Targets.Add(target);
                return await _context.SaveChangesAsync() > 0;


            }
        }

        // DELETE: api/Targets/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTarget(int id)
        {
            var target = await _context.Targets.FindAsync(id);
            if (target == null)
            {
                return NotFound();
            }

            _context.Targets.Remove(target);
            await _context.SaveChangesAsync();

            return Ok();
        }

        private bool TargetExists(int id)
        {
            return _context.Targets.Any(e => e.Id == id);
        }

        [HttpGet]
        [Route("GetTargetMain")]
        public async Task<List<TargetList>> GetTargetMain()
        {
            return  await( from t in  _context.Targets
                           where t.MainTarget && t.Active
                           orderby t.Sort 
                           select new TargetList 
                           { 
                              Label=t.Name ,
                              LabelEn=t.NameEn ,
                               Value= t.Id
                           }).ToListAsync();
        }
    
       

        [HttpGet]
        [Route("GetTargetscorr")]
        public async Task<ActionResult<TargetScorrDto?>> GetTargetscorr(int  year , int perentTargetId , int scorr)
        {

            Target? target = await _context.Targets.FindAsync( perentTargetId);
            if(target is null)
            {
                return BadRequest();
            }
          var x =await (from t in _context.Targets
                          where t.MainTarget
                          && t.Active
                          && t.Id == perentTargetId
                          && t.Year == target.Year
                        select new TargetScorrDto
                          {
                              MainTargetScorr = t.TargetScorr,
                              SumSubTargetScorr = _context.Targets.Where(i => i.PerentTargetId == t.Id && i.Active && i.Year == year && !i.MainTarget).Sum(i => i.TargetScorr),
                          }).FirstOrDefaultAsync();
            return x;          
        }



    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SPNI.Server.Data;
using SPNI.Server.DTO;
using SPNI.Server.Model;

namespace SPNI.Server.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]

    public class SubMangeMinistriesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public SubMangeMinistriesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/SubMangeMinistries
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SubManageMinistrysDto>>> GetSubManageMinistrys()
        {
             
            var x = await (from s in _context.SubManageMinistrys



                           select new SubManageMinistrysDtoID
                           {
                               Id = s.Id,
                               Name = s.Name ?? "",
                               NameEn = s.NameEn ?? "",
                               Position = s.Position,
                               PositionEn = s.PositionEn,
                               RankId = s.RankId,
                               RuleOfficerMinistryId=s.RuleOfficerMinistryId,
                               From =   s.From.ToString("yyyy-MM-dd"),
                               To = s.To.ToString("yyyy-MM-dd"),
                               Sort = s.Sort,
                               Active = s.Active,
                               RankName = _context.Ranks.Where(i => i.Id == s.RankId).Select(i => i.Name).FirstOrDefault() ?? "",
                               RankNameEn = _context.Ranks.Where(i => i.Id == s.RankId).Select(i => i.NameEn).FirstOrDefault() ?? "",
                               RuleOfficerMinistryName = _context.RuleOfficerMinistrys.Where(i => i.Id == s.RuleOfficerMinistryId).Select(i => i.Name).FirstOrDefault() ?? "",
                               RuleOfficerMinistryNameEn = _context.RuleOfficerMinistrys.Where(i => i.Id == s.RuleOfficerMinistryId).Select(i => i.NameEn).FirstOrDefault() ?? "",
                           }).OrderBy(i => i.Sort).ToListAsync();
        
            return x;
        }

        // GET: api/SubMangeMinistries/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SubManageMinistry>> GetSubManageMinistry(int id)
        {
            var subManageMinistry = await _context.SubManageMinistrys.FindAsync(id);

            if (subManageMinistry == null)
            {
                return NotFound();
            }

            return subManageMinistry;
        }

        // PUT: api/SubMangeMinistries/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<bool> PutSubManageMinistry(int id, SubManageMinistrysDto subManageMinistry)
        {
            var s = _context.SubManageMinistrys.Find(id);
             

            DateTime.TryParse(subManageMinistry.From, out DateTime From);
            DateTime.TryParse(subManageMinistry.To, out DateTime to);

            s.Active = subManageMinistry.Active;
            s.Name = subManageMinistry.Name;
            s.NameEn = subManageMinistry.NameEn;
            s.Position = subManageMinistry.Position;
            s.PositionEn = subManageMinistry.PositionEn;
            s.RankId = subManageMinistry.RankId;
            s.RuleOfficerMinistryId = subManageMinistry.RuleOfficerMinistryId;
            //s.CountryId = subManageMinistry.CountryId;
            s.From = From;
            s.To = to;
            s.Sort = subManageMinistry.Sort;



            _context.SubManageMinistrys.Update(s);
            return await _context.SaveChangesAsync() > 0;

        }

        // POST: api/SubMangeMinistries
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<bool>> PostSubManageMinistry(SubManageMinistry subManageMinistry)
        {

            _context.SubManageMinistrys.Add(subManageMinistry);
            return await _context.SaveChangesAsync() > 0;

        }

        // DELETE: api/SubMangeMinistries/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSubManageMinistry(int id)
        {
            var subManageMinistry = await _context.SubManageMinistrys.FindAsync(id);
            if (subManageMinistry == null)
            {
                return NotFound();
            }

            _context.SubManageMinistrys.Remove(subManageMinistry);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpGet]
        [Route("GetRankList")]
        public async Task<List<RankList>> GetRankList()
        {

            List<RankList> x = await (from m in _context.Ranks

                                      select new RankList
                                      {
                                          Label = m.Name ?? "",
                                          LabelEn = m.NameEn ?? "",
                                          Value = m.Id,

                                      }).ToListAsync();



            return (x);

        }
        [HttpGet]
        [Route("GetCountryList")]
        public async Task<List<CountryList>> GetCountryList()
        {

            List<CountryList> x = await (from m in _context.Counutries

                                         select new CountryList
                                         {
                                             Label = m.Name ?? "",
                                             LabelEn = m.NameEn ?? "",
                                             Value = m.Id,

                                         }).ToListAsync();



            return (x);

        }
     
    }
}

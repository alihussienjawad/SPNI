using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Humanizer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SPNI.Server.Data;
using SPNI.Server.DTO;
using SPNI.Server.Model;

namespace SPNI.Server.Controllers
{
    [Authorize(Roles = "RajManger,Admin")]
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]

    public class OfficerInfoesController(ApplicationDbContext context) : ControllerBase
    {
        private readonly ApplicationDbContext _context = context;

        // GET: api/OfficerInfoes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OfficerInfoDtoID>>> GetOfficerInfos()
        {
            
            var x = await (from s in _context.OfficerInfos
                        


                          select new OfficerInfoDtoID
                          {
                              Id = s.Id,
                              CountryName=_context.Counutries.Where(i=>i.Id == s.CountryId).Select(i=>i.Name).FirstOrDefault()??"",
                              CountryNameEn=_context.Counutries.Where(i=>i.Id == s.CountryId).Select(i=>i.NameEn).FirstOrDefault()??"",
                              Name = s.Name ?? "",
                              NameEn = s.NameEn ?? "",
                              Position = s.Position,
                              PositionEn = s.PositionEn,
                              CountryId = s.CountryId,
                              RuleOfficerMinistryId=s.RuleOfficerMinistryId,
                              Active=s.Active,
                              RankId=s.RankId,
                              From=s.From.ToString("yyyy-MM-dd"),
                              To=s.To.ToString("yyyy-MM-dd"),
                              Sort=s.Sort,
                             RuleOfficerMinistryName= _context.RuleOfficerMinistrys.Where(i=>i.Id == s.RuleOfficerMinistryId).Select(i => i.Name).FirstOrDefault() ?? "",
                             RuleOfficerMinistryNameEn= _context.RuleOfficerMinistrys.Where(i=>i.Id == s.RuleOfficerMinistryId).Select(i => i.NameEn).FirstOrDefault() ?? "",
                              RankName = _context.Ranks.Where(i => i.Id == s.RankId).Select(i => i.Name).FirstOrDefault() ?? "",
                              RankNameEn = _context.Ranks.Where(i => i.Id == s.RankId).Select(i => i.NameEn).FirstOrDefault() ?? "",

                          }).OrderBy(i => i.Sort).ToListAsync();
          
            return x;
        }

        // GET: api/OfficerInfoes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OfficerInfo>> GetOfficerInfo(int id)
        {
            var officerInfo = await _context.OfficerInfos.FindAsync(id);

            if (officerInfo == null)
            {
                return NotFound();
            }

            return officerInfo;
        }

        // PUT: api/OfficerInfoes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        //[Route("PutOfficerInfo")]
        //public async Task<OfficerInfoDto> PutOfficerInfo(int id, OfficerInfoDto officerInfoDto)
            public async Task<ActionResult<bool>> PutOfficerInfo(int id, OfficerInfoDto officerInfoDto)
        {
            var sen = _context.OfficerInfos.Find(id);
            if (sen is not null)
            {
                DateTime.TryParse(officerInfoDto.From, out DateTime From);
                DateTime.TryParse(officerInfoDto.To, out DateTime to);

                sen.Name = officerInfoDto.Name;
                sen.NameEn = officerInfoDto.NameEn;
                sen.Position = officerInfoDto.Position;
                sen.PositionEn = officerInfoDto.PositionEn;
                sen.RankId = officerInfoDto.RankId;
                sen.CountryId = officerInfoDto.CountryId;
                sen.RuleOfficerMinistryId = officerInfoDto.RuleOfficerMinistryId;
                sen.Active= officerInfoDto.Active;
                sen.From = From;
                sen.To = to;
                sen.Sort = officerInfoDto.Sort;



                _context.OfficerInfos.Update(sen);
                return await _context.SaveChangesAsync() > 0;
            }
            return false;
            
        }

        // POST: api/OfficerInfoes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
  
        [HttpPost]
        public async Task<ActionResult<bool>> PostOfficerInfo(OfficerInfoDto officerInfo)
        {
            DateTime.TryParse(officerInfo.From, out DateTime From);
            DateTime.TryParse(officerInfo.To, out DateTime to);

            OfficerInfo officerInfoo = new()
            {
                
                Name = officerInfo.Name,
                NameEn = officerInfo.NameEn,
                Position = officerInfo.Position,
                PositionEn = officerInfo.PositionEn,
                CountryId =  officerInfo.CountryId,
                RankId =  officerInfo.RankId,
                RuleOfficerMinistryId= officerInfo.RuleOfficerMinistryId,
                Active= officerInfo.Active,
                 From = From,
                To = to,
                Sort = officerInfo.Sort
            };
            _context.OfficerInfos.Add(officerInfoo);

            return await _context.SaveChangesAsync()>0;    
        }

        // DELETE: api/OfficerInfoes/5
        [HttpDelete("{id}")]
        //[Route("DeleteOfficerInfo")]
        public async Task<ActionResult<bool>> DeleteOfficerInfo(int id)
        {
            var officerInfo = await _context.OfficerInfos.FindAsync(id);
            if (officerInfo == null)
            {
                return false;
            }

            _context.OfficerInfos.Remove(officerInfo);
            await _context.SaveChangesAsync();

            return true;
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

        [HttpGet]
        [Route("GetRuleList")]
        public async Task<List<RuleList>> GetRuleList()
        {

            List<RuleList> x = await (from m in _context.RuleOfficerMinistrys

                                         select new RuleList
                                         {
                                             Label = m.Name ?? "",
                                             LabelEn = m.NameEn ?? "",
                                             Value = m.Id,

                                         }).ToListAsync();



            return (x);

        }
    }
}



using SPNI.Server.Model;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SPNI.Models;
 






namespace SPNI.Server.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
             : base(options) { }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);


 
           
      
        }

        public DbSet<Country> Counutries { get; set; }
        public DbSet<OfficerInfo> OfficerInfos { get; set; }
        public DbSet<Rank> Ranks { get; set; }
        public DbSet<SpiAttitude> SpiAttitudes { get; set; }
        public DbSet<SpiUnit> SpiUnits { get; set; }
        public DbSet<Target> Targets { get; set; }
      
        public DbSet<Unit> Units { get; set; }
        public DbSet<ManageMinistry> ManageMinistry { get; set; }
        public DbSet<Posted> Posteds { get; set; }
        public DbSet<SeenPosted> SeenPosteds { get; set; }
        public DbSet<SubManageMinistry> SubManageMinistrys { get; set; }
        public DbSet<ApplicationRole> ApplicationRoles { get; set; }
        public DbSet<ApplicationUser> ApplicationUser { get; set; }
        public DbSet<Images> Imagess { get; set; }
        public DbSet<SpniPdf> SpniPdfs { get; set; }
        public DbSet<ApplicationUserManageMinistry> ApplicationUserManageMinistries { get; set; }
        public DbSet<News> Newses { get; set; }
        public DbSet<RuleOfficerMinistry> RuleOfficerMinistrys { get; set; }
 

        public DbSet<TargetManageMinistry> TargetManageMinistries { get; set; }
    }

}
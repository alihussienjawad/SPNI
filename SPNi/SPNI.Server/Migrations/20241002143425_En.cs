using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SPNI.Server.Migrations
{
    /// <inheritdoc />
    public partial class En : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "NameEn",
                table: "SubManageMinistrys",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PositionEn",
                table: "SubManageMinistrys",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DescriptionEn",
                table: "SpniPdfs",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NameEn",
                table: "SpniPdfs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "NameEn",
                table: "SpiUnits",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "NameEn",
                table: "RuleOfficerMinistrys",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "NameEn",
                table: "Ranks",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ActionEn",
                table: "Posteds",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "NameEn",
                table: "OfficerInfos",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PositionEn",
                table: "OfficerInfos",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DetailsEn",
                table: "Newses",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            //migrationBuilder.AddColumn<string>(
            //    name: "NameEn",
            //    table: "ManageMinistry",
            //    type: "nvarchar(max)",
            //    nullable: false,
            //    defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "DescriptionEn",
                table: "Imagess",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NameEn",
                table: "Imagess",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "NameEn",
                table: "Counutries",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NameEn",
                table: "SubManageMinistrys");

            migrationBuilder.DropColumn(
                name: "PositionEn",
                table: "SubManageMinistrys");

            migrationBuilder.DropColumn(
                name: "DescriptionEn",
                table: "SpniPdfs");

            migrationBuilder.DropColumn(
                name: "NameEn",
                table: "SpniPdfs");

            migrationBuilder.DropColumn(
                name: "NameEn",
                table: "SpiUnits");

            migrationBuilder.DropColumn(
                name: "NameEn",
                table: "RuleOfficerMinistrys");

            migrationBuilder.DropColumn(
                name: "NameEn",
                table: "Ranks");

            migrationBuilder.DropColumn(
                name: "ActionEn",
                table: "Posteds");

            migrationBuilder.DropColumn(
                name: "NameEn",
                table: "OfficerInfos");

            migrationBuilder.DropColumn(
                name: "PositionEn",
                table: "OfficerInfos");

            migrationBuilder.DropColumn(
                name: "DetailsEn",
                table: "Newses");

            //migrationBuilder.DropColumn(
            //    name: "NameEn",
            //    table: "ManageMinistry");

            migrationBuilder.DropColumn(
                name: "DescriptionEn",
                table: "Imagess");

            migrationBuilder.DropColumn(
                name: "NameEn",
                table: "Imagess");

            migrationBuilder.DropColumn(
                name: "NameEn",
                table: "Counutries");
        }
    }
}

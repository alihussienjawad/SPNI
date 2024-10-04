using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SPNI.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddRateToAttitude : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "RateComplete",
                table: "SpiAttitudes",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "Active",
                table: "OfficerInfos",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RateComplete",
                table: "SpiAttitudes");

            migrationBuilder.DropColumn(
                name: "Active",
                table: "OfficerInfos");
        }
    }
}

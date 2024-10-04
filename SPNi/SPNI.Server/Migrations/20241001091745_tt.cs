using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SPNI.Server.Migrations
{
    /// <inheritdoc />
    public partial class tt : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ActionTakenEn",
                table: "SpiAttitudes",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "FollowEn",
                table: "SpiAttitudes",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ResolutionEn",
                table: "SpiAttitudes",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "SuggistionEn",
                table: "SpiAttitudes",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ActionTakenEn",
                table: "SpiAttitudes");

            migrationBuilder.DropColumn(
                name: "FollowEn",
                table: "SpiAttitudes");

            migrationBuilder.DropColumn(
                name: "ResolutionEn",
                table: "SpiAttitudes");

            migrationBuilder.DropColumn(
                name: "SuggistionEn",
                table: "SpiAttitudes");
        }
    }
}

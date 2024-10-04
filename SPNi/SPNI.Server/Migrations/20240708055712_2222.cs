using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SPNI.Server.Migrations
{
    /// <inheritdoc />
    public partial class _2222 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.DropForeignKey(
            //    name: "FK_OfficerInfos_Counutries_CounutryId",
            //    table: "OfficerInfos");

            //migrationBuilder.DropIndex(
            //    name: "IX_OfficerInfos_CounutryId",
            //    table: "OfficerInfos");

            //migrationBuilder.DropColumn(
            //    name: "CounutryId",
            //    table: "OfficerInfos");

            migrationBuilder.RenameColumn(
                name: "year",
                table: "SpiAttitudes",
                newName: "Year");

            migrationBuilder.AddColumn<int>(
                name: "Day",
                table: "Targets",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "FullDate",
                table: "Targets",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "Month",
                table: "Targets",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Year",
                table: "Targets",
                type: "int",
                nullable: false,
                defaultValue: 0);

            //migrationBuilder.CreateTable(
            //    name: "ManageMinistry",
            //    columns: table => new
            //    {
            //        Id = table.Column<int>(type: "int", nullable: false),
            //        Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
            //    },
            //    constraints: table =>
            //    {
            //    });

            migrationBuilder.CreateIndex(
                name: "IX_OfficerInfos_CountryId",
                table: "OfficerInfos",
                column: "CountryId");

            migrationBuilder.AddForeignKey(
                name: "FK_OfficerInfos_Counutries_CountryId",
                table: "OfficerInfos",
                column: "CountryId",
                principalTable: "Counutries",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OfficerInfos_Counutries_CountryId",
                table: "OfficerInfos");

            migrationBuilder.DropTable(
                name: "ManageMinistry");

            migrationBuilder.DropIndex(
                name: "IX_OfficerInfos_CountryId",
                table: "OfficerInfos");

            migrationBuilder.DropColumn(
                name: "Day",
                table: "Targets");

            migrationBuilder.DropColumn(
                name: "FullDate",
                table: "Targets");

            migrationBuilder.DropColumn(
                name: "Month",
                table: "Targets");

            migrationBuilder.DropColumn(
                name: "Year",
                table: "Targets");

            migrationBuilder.RenameColumn(
                name: "Year",
                table: "SpiAttitudes",
                newName: "year");

            migrationBuilder.AddColumn<int>(
                name: "CounutryId",
                table: "OfficerInfos",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_OfficerInfos_CounutryId",
                table: "OfficerInfos",
                column: "CounutryId");

            migrationBuilder.AddForeignKey(
                name: "FK_OfficerInfos_Counutries_CounutryId",
                table: "OfficerInfos",
                column: "CounutryId",
                principalTable: "Counutries",
                principalColumn: "Id");
        }
    }
}

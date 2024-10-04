using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SPNI.Server.Migrations
{
    /// <inheritdoc />
    public partial class ss : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "RuleOfficerMinistryId",
                table: "SubManageMinistrys",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "RuleOfficerMinistryId",
                table: "OfficerInfos",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedDate",
                table: "Imagess",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateTable(
                name: "RuleOfficerMinistrys",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RuleOfficerMinistrys", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SubManageMinistrys_RuleOfficerMinistryId",
                table: "SubManageMinistrys",
                column: "RuleOfficerMinistryId");

            migrationBuilder.CreateIndex(
                name: "IX_OfficerInfos_RuleOfficerMinistryId",
                table: "OfficerInfos",
                column: "RuleOfficerMinistryId");

            migrationBuilder.AddForeignKey(
                name: "FK_OfficerInfos_RuleOfficerMinistrys_RuleOfficerMinistryId",
                table: "OfficerInfos",
                column: "RuleOfficerMinistryId",
                principalTable: "RuleOfficerMinistrys",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SubManageMinistrys_RuleOfficerMinistrys_RuleOfficerMinistryId",
                table: "SubManageMinistrys",
                column: "RuleOfficerMinistryId",
                principalTable: "RuleOfficerMinistrys",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OfficerInfos_RuleOfficerMinistrys_RuleOfficerMinistryId",
                table: "OfficerInfos");

            migrationBuilder.DropForeignKey(
                name: "FK_SubManageMinistrys_RuleOfficerMinistrys_RuleOfficerMinistryId",
                table: "SubManageMinistrys");

            migrationBuilder.DropTable(
                name: "RuleOfficerMinistrys");

            migrationBuilder.DropIndex(
                name: "IX_SubManageMinistrys_RuleOfficerMinistryId",
                table: "SubManageMinistrys");

            migrationBuilder.DropIndex(
                name: "IX_OfficerInfos_RuleOfficerMinistryId",
                table: "OfficerInfos");

            migrationBuilder.DropColumn(
                name: "RuleOfficerMinistryId",
                table: "SubManageMinistrys");

            migrationBuilder.DropColumn(
                name: "RuleOfficerMinistryId",
                table: "OfficerInfos");

            migrationBuilder.DropColumn(
                name: "CreatedDate",
                table: "Imagess");
        }
    }
}

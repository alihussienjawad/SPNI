using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SPNI.Server.Migrations
{
    /// <inheritdoc />
    public partial class UpdateAppLast : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "MainTarget",
                table: "Targets",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "PerentTargetId",
                table: "Targets",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TargetScorr",
                table: "Targets",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "From",
                table: "SubManageMinistrys",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Position",
                table: "SubManageMinistrys",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "RankId",
                table: "SubManageMinistrys",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "To",
                table: "SubManageMinistrys",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "EndDateToComplete",
                table: "SpiAttitudes",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<bool>(
                name: "EndNotComplete",
                table: "SpiAttitudes",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsComplete",
                table: "SpiAttitudes",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "StartDateToComplete",
                table: "SpiAttitudes",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "From",
                table: "OfficerInfos",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "Sort",
                table: "OfficerInfos",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "To",
                table: "OfficerInfos",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AlterColumn<string>(
                name: "Details",
                table: "Newses",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            //migrationBuilder.AlterColumn<string>(
            //    name: "Name",
            //    table: "ManageMinistry",
            //    type: "nvarchar(max)",
            //    nullable: false,
            //    defaultValue: "",
            //    oldClrType: typeof(string),
            //    oldType: "nvarchar(max)",
            //    oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ApplicationUserId",
                table: "Imagess",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Counutries",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "TargetManageMinistries",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ManageMinistryId = table.Column<int>(type: "int", nullable: false),
                    TargetId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TargetManageMinistries", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SubManageMinistrys_RankId",
                table: "SubManageMinistrys",
                column: "RankId");

            migrationBuilder.CreateIndex(
                name: "IX_Imagess_ApplicationUserId",
                table: "Imagess",
                column: "ApplicationUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Imagess_AspNetUsers_ApplicationUserId",
                table: "Imagess",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SubManageMinistrys_Ranks_RankId",
                table: "SubManageMinistrys",
                column: "RankId",
                principalTable: "Ranks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Imagess_AspNetUsers_ApplicationUserId",
                table: "Imagess");

            migrationBuilder.DropForeignKey(
                name: "FK_SubManageMinistrys_Ranks_RankId",
                table: "SubManageMinistrys");

            migrationBuilder.DropTable(
                name: "TargetManageMinistries");

            migrationBuilder.DropIndex(
                name: "IX_SubManageMinistrys_RankId",
                table: "SubManageMinistrys");

            migrationBuilder.DropIndex(
                name: "IX_Imagess_ApplicationUserId",
                table: "Imagess");

            migrationBuilder.DropColumn(
                name: "MainTarget",
                table: "Targets");

            migrationBuilder.DropColumn(
                name: "PerentTargetId",
                table: "Targets");

            migrationBuilder.DropColumn(
                name: "TargetScorr",
                table: "Targets");

            migrationBuilder.DropColumn(
                name: "From",
                table: "SubManageMinistrys");

            migrationBuilder.DropColumn(
                name: "Position",
                table: "SubManageMinistrys");

            migrationBuilder.DropColumn(
                name: "RankId",
                table: "SubManageMinistrys");

            migrationBuilder.DropColumn(
                name: "To",
                table: "SubManageMinistrys");

            migrationBuilder.DropColumn(
                name: "EndDateToComplete",
                table: "SpiAttitudes");

            migrationBuilder.DropColumn(
                name: "EndNotComplete",
                table: "SpiAttitudes");

            migrationBuilder.DropColumn(
                name: "IsComplete",
                table: "SpiAttitudes");

            migrationBuilder.DropColumn(
                name: "StartDateToComplete",
                table: "SpiAttitudes");

            migrationBuilder.DropColumn(
                name: "From",
                table: "OfficerInfos");

            migrationBuilder.DropColumn(
                name: "Sort",
                table: "OfficerInfos");

            migrationBuilder.DropColumn(
                name: "To",
                table: "OfficerInfos");

            migrationBuilder.DropColumn(
                name: "ApplicationUserId",
                table: "Imagess");

            migrationBuilder.AlterColumn<string>(
                name: "Details",
                table: "Newses",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            ////migrationBuilder.AlterColumn<string>(
            ////    name: "Name",
            ////    table: "ManageMinistry",
            ////    type: "nvarchar(max)",
            ////    nullable: true,
            ////    oldClrType: typeof(string),
            ////    oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Counutries",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");
        }
    }
}

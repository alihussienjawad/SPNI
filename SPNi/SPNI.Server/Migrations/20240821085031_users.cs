using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SPNI.Server.Migrations
{
    /// <inheritdoc />
    public partial class users : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ApplicationUserSpiUnit");

            migrationBuilder.AlterColumn<string>(
                name: "ImageFileName",
                table: "Imagess",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateTable(
                name: "ApplicationUserManageMinistries",
                columns: table => new
                {
                    ApplicationUserId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ManageMinistryId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ApplicationUserManageMinistries");

            migrationBuilder.AlterColumn<string>(
                name: "ImageFileName",
                table: "Imagess",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "ApplicationUserSpiUnit",
                columns: table => new
                {
                    ApplicationUsersId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    SpiUnitsId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApplicationUserSpiUnit", x => new { x.ApplicationUsersId, x.SpiUnitsId });
                    table.ForeignKey(
                        name: "FK_ApplicationUserSpiUnit_AspNetUsers_ApplicationUsersId",
                        column: x => x.ApplicationUsersId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ApplicationUserSpiUnit_SpiUnits_SpiUnitsId",
                        column: x => x.SpiUnitsId,
                        principalTable: "SpiUnits",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ApplicationUserSpiUnit_SpiUnitsId",
                table: "ApplicationUserSpiUnit",
                column: "SpiUnitsId");
        }
    }
}

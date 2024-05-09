using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UserAppLogic.Migrations
{
    /// <inheritdoc />
    public partial class LastMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "id",
                table: "Barcode",
                newName: "Id");

            migrationBuilder.AddColumn<string>(
                name: "AppUserId",
                table: "Barcode",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Barcode_AppUserId",
                table: "Barcode",
                column: "AppUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Barcode_AspNetUsers_AppUserId",
                table: "Barcode",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Barcode_AspNetUsers_AppUserId",
                table: "Barcode");

            migrationBuilder.DropIndex(
                name: "IX_Barcode_AppUserId",
                table: "Barcode");

            migrationBuilder.DropColumn(
                name: "AppUserId",
                table: "Barcode");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Barcode",
                newName: "id");
        }
    }
}

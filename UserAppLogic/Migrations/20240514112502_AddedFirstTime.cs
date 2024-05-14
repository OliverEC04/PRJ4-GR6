using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UserAppLogic.Migrations
{
    /// <inheritdoc />
    public partial class AddedFirstTime : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "FirsTimeOrNot",
                table: "AspNetUsers",
                type: "int",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FirsTimeOrNot",
                table: "AspNetUsers");
        }
    }
}

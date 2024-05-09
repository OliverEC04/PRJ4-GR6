using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UserAppLogic.Migrations
{
    /// <inheritdoc />
    public partial class UserDailyIntake : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CurrentCalories",
                table: "AspNetUsers",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "DailyCalories",
                table: "AspNetUsers",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "DailyCarbs",
                table: "AspNetUsers",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "DailyFat",
                table: "AspNetUsers",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "DailyProtein",
                table: "AspNetUsers",
                type: "int",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CurrentCalories",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "DailyCalories",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "DailyCarbs",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "DailyFat",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "DailyProtein",
                table: "AspNetUsers");
        }
    }
}

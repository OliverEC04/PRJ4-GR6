using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UserAppLogic.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedUser1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CurrentCarbs",
                table: "AspNetUsers",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CurrentFat",
                table: "AspNetUsers",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CurrentProtein",
                table: "AspNetUsers",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CurrentWater",
                table: "AspNetUsers",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "DailyWater",
                table: "AspNetUsers",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "activityLevel",
                table: "AspNetUsers",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "difficultyLevel",
                table: "AspNetUsers",
                type: "int",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CurrentCarbs",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "CurrentFat",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "CurrentProtein",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "CurrentWater",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "DailyWater",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "activityLevel",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "difficultyLevel",
                table: "AspNetUsers");
        }
    }
}

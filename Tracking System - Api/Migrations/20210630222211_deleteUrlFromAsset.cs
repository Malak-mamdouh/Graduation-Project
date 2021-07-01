using Microsoft.EntityFrameworkCore.Migrations;

namespace Tracking_System___Api.Migrations
{
    public partial class deleteUrlFromAsset : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Url",
                table: "assets");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Url",
                table: "assets",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}

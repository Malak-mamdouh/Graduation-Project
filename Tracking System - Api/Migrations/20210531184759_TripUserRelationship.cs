using Microsoft.EntityFrameworkCore.Migrations;

namespace Tracking_System___Api.Migrations
{
    public partial class TripUserRelationship : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Trips_assets_AssetId",
                table: "Trips");

            migrationBuilder.RenameColumn(
                name: "AssetId",
                table: "Trips",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Trips_AssetId",
                table: "Trips",
                newName: "IX_Trips_UserId");

            migrationBuilder.AddColumn<string>(
                name: "Region",
                table: "customers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddForeignKey(
                name: "FK_Trips_AspNetUsers_UserId",
                table: "Trips",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Trips_AspNetUsers_UserId",
                table: "Trips");

            migrationBuilder.DropColumn(
                name: "Region",
                table: "customers");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Trips",
                newName: "AssetId");

            migrationBuilder.RenameIndex(
                name: "IX_Trips_UserId",
                table: "Trips",
                newName: "IX_Trips_AssetId");

            migrationBuilder.AddForeignKey(
                name: "FK_Trips_assets_AssetId",
                table: "Trips",
                column: "AssetId",
                principalTable: "assets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

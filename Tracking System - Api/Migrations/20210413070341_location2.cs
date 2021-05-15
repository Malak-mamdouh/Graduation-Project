using Microsoft.EntityFrameworkCore.Migrations;

namespace Tracking_System___Api.Migrations
{
    public partial class location2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_location_Trips_TripId",
                table: "location");

            migrationBuilder.DropForeignKey(
                name: "FK_Trips_location_EndId",
                table: "Trips");

            migrationBuilder.DropForeignKey(
                name: "FK_Trips_location_StartId",
                table: "Trips");

            migrationBuilder.DropIndex(
                name: "IX_Trips_EndId",
                table: "Trips");

            migrationBuilder.DropIndex(
                name: "IX_Trips_StartId",
                table: "Trips");

            migrationBuilder.DropPrimaryKey(
                name: "PK_location",
                table: "location");

            migrationBuilder.DropColumn(
                name: "EndId",
                table: "Trips");

            migrationBuilder.DropColumn(
                name: "StartId",
                table: "Trips");

            migrationBuilder.RenameTable(
                name: "location",
                newName: "locations");

            migrationBuilder.RenameIndex(
                name: "IX_location_TripId",
                table: "locations",
                newName: "IX_locations_TripId");

            migrationBuilder.AlterColumn<int>(
                name: "TripId",
                table: "locations",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_locations",
                table: "locations",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_locations_Trips_TripId",
                table: "locations",
                column: "TripId",
                principalTable: "Trips",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_locations_Trips_TripId",
                table: "locations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_locations",
                table: "locations");

            migrationBuilder.RenameTable(
                name: "locations",
                newName: "location");

            migrationBuilder.RenameIndex(
                name: "IX_locations_TripId",
                table: "location",
                newName: "IX_location_TripId");

            migrationBuilder.AddColumn<int>(
                name: "EndId",
                table: "Trips",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "StartId",
                table: "Trips",
                type: "int",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "TripId",
                table: "location",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddPrimaryKey(
                name: "PK_location",
                table: "location",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Trips_EndId",
                table: "Trips",
                column: "EndId");

            migrationBuilder.CreateIndex(
                name: "IX_Trips_StartId",
                table: "Trips",
                column: "StartId");

            migrationBuilder.AddForeignKey(
                name: "FK_location_Trips_TripId",
                table: "location",
                column: "TripId",
                principalTable: "Trips",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Trips_location_EndId",
                table: "Trips",
                column: "EndId",
                principalTable: "location",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Trips_location_StartId",
                table: "Trips",
                column: "StartId",
                principalTable: "location",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}

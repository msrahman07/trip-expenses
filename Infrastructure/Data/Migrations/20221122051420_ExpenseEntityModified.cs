using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class ExpenseEntityModified : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Expenses_ExpenseId",
                table: "AspNetUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_Expenses_AspNetUsers_SpenderId",
                table: "Expenses");

            migrationBuilder.DropIndex(
                name: "IX_Expenses_SpenderId",
                table: "Expenses");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_ExpenseId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "SpenderId",
                table: "Expenses");

            migrationBuilder.DropColumn(
                name: "ExpenseId",
                table: "AspNetUsers");

            migrationBuilder.AddColumn<int>(
                name: "ExpenseId",
                table: "TripAttendees",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SpenderAppUserId",
                table: "Expenses",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "SpenderTripId",
                table: "Expenses",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_TripAttendees_ExpenseId",
                table: "TripAttendees",
                column: "ExpenseId");

            migrationBuilder.CreateIndex(
                name: "IX_Expenses_SpenderAppUserId_SpenderTripId",
                table: "Expenses",
                columns: new[] { "SpenderAppUserId", "SpenderTripId" });

            migrationBuilder.AddForeignKey(
                name: "FK_Expenses_TripAttendees_SpenderAppUserId_SpenderTripId",
                table: "Expenses",
                columns: new[] { "SpenderAppUserId", "SpenderTripId" },
                principalTable: "TripAttendees",
                principalColumns: new[] { "AppUserId", "TripId" },
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TripAttendees_Expenses_ExpenseId",
                table: "TripAttendees",
                column: "ExpenseId",
                principalTable: "Expenses",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Expenses_TripAttendees_SpenderAppUserId_SpenderTripId",
                table: "Expenses");

            migrationBuilder.DropForeignKey(
                name: "FK_TripAttendees_Expenses_ExpenseId",
                table: "TripAttendees");

            migrationBuilder.DropIndex(
                name: "IX_TripAttendees_ExpenseId",
                table: "TripAttendees");

            migrationBuilder.DropIndex(
                name: "IX_Expenses_SpenderAppUserId_SpenderTripId",
                table: "Expenses");

            migrationBuilder.DropColumn(
                name: "ExpenseId",
                table: "TripAttendees");

            migrationBuilder.DropColumn(
                name: "SpenderAppUserId",
                table: "Expenses");

            migrationBuilder.DropColumn(
                name: "SpenderTripId",
                table: "Expenses");

            migrationBuilder.AddColumn<string>(
                name: "SpenderId",
                table: "Expenses",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ExpenseId",
                table: "AspNetUsers",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Expenses_SpenderId",
                table: "Expenses",
                column: "SpenderId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_ExpenseId",
                table: "AspNetUsers",
                column: "ExpenseId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Expenses_ExpenseId",
                table: "AspNetUsers",
                column: "ExpenseId",
                principalTable: "Expenses",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Expenses_AspNetUsers_SpenderId",
                table: "Expenses",
                column: "SpenderId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}

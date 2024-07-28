using Cinesplain.Server.Utilities;
using TMDBModels.Models;

namespace Cinesplain.Test;

public class CinesplainTests
{
    [Fact]
    public void CombineCrewCredits_ShouldCombineCrewCreditsWithSameId()
    {
        // Arrange
        var crewCredits = new List<ListDisplayMovieCrewCredit>
        {
            new()
            {
                Id = 1,
                Job = "Director",
                Department = "Production"
            },
            new()
            {
                Id = 2,
                Job = "Writer",
                Department = "Writing"
            },
            new()
            {
                Id = 1,
                Job = "Producer",
                Department = "Production"
            },
            new()
            {
                Id = 3,
                Job = "Editor",
                Department = "Editing"
            },
            new()
            {
                Id = 4,
                Job = "Cinematographer",
                Department = "Cinematography"
            },
            new()
            {
                Id = 1,
                Job = "Screenwriter",
                Department = "Writing"
            }
        };

        var expectedCredits = new List<ListDisplayMovieCrewCredit>
        {
            new()
            {
                Id = 1,
                Job = "Director, Producer, Screenwriter",
                Department = "Production, Writing"
            },
            new()
            {
                Id = 2,
                Job = "Writer",
                Department = "Writing"
            },
            new()
            {
                Id = 3,
                Job = "Editor",
                Department = "Editing"
            },
            new()
            {
                Id = 4,
                Job = "Cinematographer",
                Department = "Cinematography"
            }
        };

        // Act
        var combinedCredits = ApiUtility.CombineCrewCredits(crewCredits);

        // Assert
        foreach (var expectedCredit in expectedCredits)
        {
            var combinedCredit = combinedCredits.FirstOrDefault(c => c.Id == expectedCredit.Id);
            Assert.NotNull(combinedCredit);

            Assert.Equal(expectedCredit.Job, combinedCredit.Job);
            Assert.Equal(expectedCredit.Department, combinedCredit.Department);
        }
    }
}

using System;
using System.Linq;
using coderise.service.Controllers;
using FluentAssertions;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace coderise.service.tests.Controllers
{
    [TestClass]
    public class ShelvesetsControllerTest
    {
        [TestMethod]
        public void Get()
        {

            var target = new ShelvesetsController();

            var shelvesets = target.Get().ToArray();

            shelvesets.Should().HaveCount(2);

            shelvesets[0].Id.Should().Be(1);
            shelvesets[0].Title.Should().Be("the best shelveset ever :)");
            shelvesets[0].Description.Should().Be("to code review best shelveset");
            shelvesets[0].CreatedAt.Should().BeCloseTo(DateTime.Now.Subtract(TimeSpan.FromMinutes(5)));
            shelvesets[0].FileList.Should().HaveCount(2);
            shelvesets[0].FileList[0].Should().Be("model.cs");
            shelvesets[0].FileList[1].Should().Be("shit-code.config");

            shelvesets[1].Id.Should().Be(2);
            shelvesets[1].Title.Should().Be("Default title");
            shelvesets[1].Description.Should().Be("it is a long long story");
            shelvesets[1].CreatedAt.Should().BeCloseTo(DateTime.Now.Subtract(TimeSpan.FromDays(3)));
            shelvesets[1].FileList.Should().HaveCount(2);
            shelvesets[1].FileList[0].Should().Be("app.config");
            shelvesets[1].FileList[1].Should().Be("Global.asax.cs");
        }
    }
}

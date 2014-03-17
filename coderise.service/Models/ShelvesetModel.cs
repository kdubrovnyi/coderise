using System;

namespace coderise.service.Models
{
    public class ShelvesetModel
    {
        public long Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public string Owner { get; set; }

        public DateTime CreatedAt { get; set; }

        public string[] FileList { get; set; }
    }
}
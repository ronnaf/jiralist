export type JiraIssue = {
  expand: string;
  id: string;
  self: string;
  key: string;
  fields: {
    summary: string;
    assignee: {
      self: string;
      accountId: string;
      emailAddress: string;
      avatarUrls: {
        '48x48': string;
        '24x24': string;
        '16x16': string;
        '32x32': string;
      };
      displayName: string;
      active: boolean;
      timeZone: string;
      accountType: string;
    };
    status: {
      self: string;
      description: string;
      iconUrl: string;
      name: string;
      id: string;
      statusCategory: {
        self: string;
        id: number;
        key: string;
        colorName: string;
        name: string;
      };
    };
  };
};

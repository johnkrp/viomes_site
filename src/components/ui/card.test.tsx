import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("Card Component", () => {
  it("renders card with header, title, and content", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Test Card</CardTitle>
          <CardDescription>This is a test card</CardDescription>
        </CardHeader>
        <CardContent>Content goes here</CardContent>
      </Card>
    );

    expect(screen.getByText("Test Card")).toBeInTheDocument();
    expect(screen.getByText("This is a test card")).toBeInTheDocument();
    expect(screen.getByText("Content goes here")).toBeInTheDocument();
  });

  it("renders card with only content", () => {
    render(
      <Card>
        <CardContent>Minimal card</CardContent>
      </Card>
    );
    expect(screen.getByText("Minimal card")).toBeInTheDocument();
  });

  it("applies correct styling classes", () => {
    const { container } = render(
      <Card>
        <CardContent>Test</CardContent>
      </Card>
    );
    const card = container.querySelector("[class*='border']");
    expect(card).toBeInTheDocument();
  });
});

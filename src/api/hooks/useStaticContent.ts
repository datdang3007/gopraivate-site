
import { useMutation } from "@tanstack/react-query";
import { StaticContentService } from "../services/static";
import { StaticContentRequest, StaticContentResponse } from "../types/static";

export const useStaticContent = () => {
  return useMutation<StaticContentResponse, Error, StaticContentRequest>({
    mutationFn: (request: StaticContentRequest) =>
      StaticContentService.getStaticContent(request),
  });
};

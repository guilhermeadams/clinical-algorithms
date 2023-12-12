import enum


class NodesTypes(enum.Enum):
    StartElement = "StartElement"
    ActionElement = "ActionElement"
    EvaluationElement = "EvaluationElement"
    EndElement = "EndElement"
    LinkElement = "LinkElement"
    LaneElement = "LaneElement"
    link = "link"


class RecommendationType(enum.Enum):
    formal = "formal"
    good_practices = "good_practices"
    not_formal = "not_formal"


class InterventionType(enum.Enum):
    treatment = "treatment"
    diagnosis = "diagnosis"
    population_classification = "population_classification"


class Direction(enum.Enum):
    for_intervention = "for_intervention"
    against_intervention = "against_intervention"
    both = "both"


class Strength(enum.Enum):
    strong = "strong"
    weak = "weak"


class Certainty(enum.Enum):
    high = "high"
    moderate = "moderate"
    low = "low"
    not_specified = "not_specified"

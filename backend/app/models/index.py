import enum
from sqlalchemy import Column, ForeignKey, DATE, TEXT, VARCHAR, BIGINT, Enum
from app.db import Base


class Algorithms(Base):
    __tablename__ = "algorithms"
    id = Column(BIGINT, primary_key=True, index=True)
    title = Column(VARCHAR(255), index=True)
    description = Column(TEXT, index=True)
    version = Column(VARCHAR(10))
    updated_at = Column(DATE)


class AlgorithmsCategories(Base):
    __tablename__ = "algorithms_categories"
    id = Column(BIGINT, primary_key=True, index=True)
    name = Column(VARCHAR(255))
    updated_at = Column(DATE)


class AlgorithmsCategoriesRelated(Base):
    __tablename__ = "algorithms_categories_related"
    id = Column(BIGINT, primary_key=True, index=True)
    algorithm_id = Column(BIGINT, ForeignKey("algorithms.id"), nullable=False)
    category_id = Column(BIGINT, ForeignKey("algorithms_categories.id"), nullable=False)
    updated_at = Column(DATE)


class AlgorithmsGraphs(Base):
    __tablename__ = "algorithms_graphs"
    id = Column(BIGINT, primary_key=True, index=True)
    algorithm_id = Column(BIGINT, ForeignKey("algorithms.id"), nullable=False)
    graph = Column(TEXT)
    updated_at = Column(DATE)


class NodesTypes(enum.Enum):
    start = "Start"
    action = "Action"
    evaluation = "Evaluation"
    end = "End"
    lane = "Lane"


class AlgorithmsNodes(Base):
    __tablename__ = "algorithms_nodes"
    id = Column(BIGINT, primary_key=True, index=True)
    algorithm_id = Column(BIGINT, ForeignKey("algorithms.id"), nullable=False)
    node_id = Column(VARCHAR(255), nullable=False)
    node_type = Column(Enum(NodesTypes), nullable=False)
    label = Column(VARCHAR(255))
    updated_at = Column(DATE)


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


class AlgorithmsNodesRecommendations(Base):
    __tablename__ = "algorithms_nodes_recommendations"
    id = Column(BIGINT, primary_key=True, index=True)
    node_id = Column(BIGINT, ForeignKey("algorithms_nodes.id"), nullable=False)
    index = Column(BIGINT, nullable=False)
    recommendation_type = Column(Enum(RecommendationType), nullable=False)
    description = Column(TEXT, index=True)
    intervention_type = Column(Enum(InterventionType), nullable=False)
    intervention = Column(VARCHAR(255), index=True)
    comparator = Column(VARCHAR(255), index=True)
    direction = Column(Enum(Direction), nullable=False)
    strength = Column(Enum(Strength), nullable=False)
    certainty_of_the_evidence = Column(Enum(Certainty), nullable=False)
    implementation_considerations = Column(TEXT, index=True)
    additional_comments = Column(TEXT, index=True)
    recommendation_source = Column(TEXT, index=True)
    updated_at = Column(DATE)

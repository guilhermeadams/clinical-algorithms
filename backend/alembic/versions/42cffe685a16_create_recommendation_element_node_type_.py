"""create recommendation_element_node_type column value

Revision ID: 42cffe685a16
Revises: 1f5df554d6cf
Create Date: 2024-01-25 13:21:28.646876

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '42cffe685a16'
down_revision: Union[str, None] = '1f5df554d6cf'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.execute("""
        ALTER TABLE nodes
        MODIFY COLUMN node_type enum(
            'StartElement',
            'ActionElement',
            'EvaluationElement',
            'EndElement',
            'LinkElement',
            'LaneElement',
            'link',
            'RecommendationTotalElement'
        )
    """)
    pass
    # ### end Alembic commands ###


def downgrade() -> None:
    op.execute("""
        ALTER TABLE nodes
        MODIFY COLUMN node_type enum(
            'StartElement',
            'ActionElement',
            'EvaluationElement',
            'EndElement',
            'LinkElement',
            'LaneElement',
            'link'
        )
    """)
    pass
    # ### end Alembic commands ###
